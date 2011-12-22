$(function() {

    drawTree();

    $('#play').click(function(event) {
        playMusic();
        event.preventDefault();
    });
    $('#play').bind('touchstart',function(event) {
        playMusic();
        event.preventDefault();
    });

    $('#pause').click(function(event) {
        pauseMusic();
        event.preventDefault();
    });
    $('#pause').bind('touchstart',function(event) {
        pauseMusic();
        event.preventDefault();
    });

    $('#frontpage').click(function(event) {
        openCard();
        event.preventDefault();
    });
    $('#frontpage').bind('touchstart',function(event) {
	      openCard();
	      event.preventDefault();
    });

    $('#firstinnerpage').click(function(event) {
        closeCard();
        event.preventDefault();
    });
    $('#firstinnerpage').bind('touchstart',function(event) {
	      closeCard();
	      event.preventDefault();
    });

    $('#song').bind('onended',function(event) {
	      alert('Song ended');
	      onMusicEnded();
    });

    document.addEventListener('keydown', function(e) { keyHandle(e); }, false);

    addSwipeListener($('body')[0], function(e) {doSwipe(e);});

    renderSnow();

});

function doSwipe(e) {
    if( e.direction == 'left' ) {
        openCard();
    } else if( e.direction == 'right' ) {
        closeCard();
    }
}

function addSwipeListener(el, listener) {

    var startX;
    var startY;
    var dx;
    var direction;

    function cancelTouch() {
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
        startX = null;
        startY = null;
        direction = null;
    }
    
    function onTouchMove(e) {
        if( e.touches.length > 1 ) {
            cancelTouch();
        } else {
            dx = e.touches[0].pageX - startX;
            var dy = e.touches[0].pageY - startY;
            if( direction == null ) {
                direction = dx;
            } else if( (direction < 0 && dx > 0) || (direction > 0 && dx < 0) || Math.abs(dy) > 44) {
                cancelTouch();
            }
        }
    }

    function onTouchEnd(e) {
    
        cancelTouch();

        if( Math.abs(dx) > 50 ) {
            listener( {target:el, direction: dx > 0 ? 'right' : 'left'} );
            dx = 0;
        }

    }

    function onTouchStart(e) {

        e.preventDefault();
        e.stopPropagation();

        if( e.touches.length == 1 ) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            el.addEventListener('touchmove', onTouchMove, false);
            el.addEventListener('touchend', onTouchEnd, false);
        }
        
    }

    el.addEventListener('touchstart', onTouchStart, false);

}

function keyHandle(e) {

    if( e.keyCode == 39 ) {
        // Right arrow
        openCard();
    } else if( e.keyCode == 37 ) {
        // Left arrow
        closeCard();
    }

}

/* From http://andrewwooldridge.com/blog/2011/12/19/canvas-based-3d-christmas-tree/, */
/* Originally from Roman Cortes' 1KB JavaScript entry http://js1k.com/2010-xmas/demo/848 */
function drawTree() {

    var b = document.body;
    var c = document.getElementsByTagName('canvas')[0];
    var a = c.getContext('2d');
    document.body.clientWidth; // fix bug in chrome.

    n = [];
    M = Math;
    Q = M.random;
    
    c.height = c.width = W = t = 446;
    J = [];
    U = 16;
    T = M.sin;
    
    function F() {
        a.clearRect(0, 0, W, W);
        for (A = T(t - 11), i = 0; i < O; L.b = L.z * A - L.x * T(t))(L = J[i++]).a = L.x * A + L.z * T(t);
        J.sort(function (a, b) {
            return a.b - b.b
        });
        for (a.font = '60px Impact', a.fillStyle = '#cca', i = 0; i < O; a.drawImage(n[(L = J[i++]).n], 207 + L.a >> 0, 150 + L.y >> 0)) if (i == O >> 1) //a.fillText('Merry Christmas!', U, 396);
        t += .02;
        setTimeout(F, 9)
    }
    for (O = k = 0; k < 12; k++) with(n[k] = c.cloneNode(0)) {
        width = height = 32;
        with(getContext('2d')) {
            if (k > 9) {
                for (i = 0; i < 99; i += U) {
                    beginPath();
                    fillStyle = V + (147 + i) + ',' + (k % 2 ? 128 + i : 0) + ',' + i + ',.5)';
                    arc(U - i / 48, 24 - i / 32, 8 - i / U, 0, M.PI * 2, 1);
                    fill()
                }
            } else for (i = W; x = T(i) * U, y = Q() * 32 - U, E = x - 10, D = y - 12, B = M.sqrt(E * E + D * D), R = (70 + B * 4) * (L = k / 9 + .8) >> 1, i--;) if (x * x + y * y < 256) {
                strokeStyle = (V = 'rgba(') + R + ',' + (R + (B * L >> 2)) + ',40,.1)';
                beginPath();
                moveTo(U + x / 2, U + y / 2);
                lineTo(U + x, U + y);
                stroke()
            }
        }
    }
    for (j = 200; j--;) for (H = j + M.sqrt(j) * 25, L = H / U, R = Q() * W, y = H / 2 - 99, x = z = i = 0; V = 3, S = i / L * 20, i < L; i++, x += T(R) * V + Q() * 6 - 3, z += T(R - 11) * V + Q() * 6 - 3, y += Q() * 8 - 4, J[O++] = {
        x: x,
        y: y,
        z: z,
        n: S >> 1
    }) if (i + 1 >= L && Q() > .8) V = 9, S += Q() * 4;
    F();

    /*
    var context = $('#tree')[0].getContext("2d");

    // Tree
    context.moveTo(150, 0);
    context.beginPath();
    context.lineTo(200, 50);
    context.lineTo(170, 50);
    context.lineTo(250, 140);
    context.lineTo(200, 140);
    context.lineTo(280, 250);
    context.lineTo(20, 250);
    context.lineTo(100, 140);
    context.lineTo(50, 140);
    context.lineTo(130, 50);
    context.lineTo(100, 50);
    context.lineTo(150, 0);
    context.strokeStyle='#406B2E';
    context.stroke();
    context.fillStyle='#5CD12E';
    context.fill();
    context.closePath();
    */

}

function playMusic() {
    $('#song')[0].play();
    $('#play').addClass('disabled');
    $('#pause').removeClass('disabled');
}

function pauseMusic() {
    $('#song')[0].pause();
    $('#play').removeClass('disabled');
    $('#pause').addClass('disabled');
}

function onMusicEnded() {
    $('#play').removeClass('disabled');
    $('#pause').addClass('disabled');
}

function openCard() {
  
    if( $('#card').data('open') === 'true' ) return;

    $('#frontpage')[0].addEventListener('webkitTransitionEnd', function(event) {

	      // Animation half way there, now need to animate the second half

        $('#firstinnerpage').css('display','block');
        $('#frontpage').css('display','none');

        // For some reason, without the timeout the animation happens instantly
        window.setTimeout(function() {
            $('#firstinnerpage').css('-webkit-transition', '-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateX(5deg) rotateY(-180deg)');
        }, 0);

        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);

    }, false);
    
    $('#firstinnerpage')[0].addEventListener('webkitTransitionEnd', function(event) {

	      // Animation complete

	      $('#card').data('open','true');	

	      this.removeEventListener('webkitTransitionEnd', arguments.callee, false);

    }, false);
    
    $('#frontpage').css('-webkit-transition', '-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateX(5deg) rotateY(-90deg)');
    
	  playMusic();

    // Experiment to see if I can get something working on Firefox
    //$('#frontpage').css('-moz-transform','translateY(-180deg)');
    
}

function closeCard() {

    if( $('#card').data('open') !== 'true' ) return;

    $('#firstinnerpage')[0].addEventListener('webkitTransitionEnd', function(event) {

	      // Animation half way there, now need to animate the second half

        $(this).css('display','none');
        $('#frontpage').css('display','block');

        // For some reason, without the timeout the animation happens instantly
        window.setTimeout(function() {
            $('#frontpage').css('-webkit-transition', '-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateX(5deg) rotateY(0deg)');
        }, 0);

        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);

    }, false);
    
    $('#frontpage')[0].addEventListener('webkitTransitionEnd', function(event) {

	      // Animation complete

	      $('#card').data('open','false');

    }, false);
    
    $('#firstinnerpage').css('-webkit-transition', '-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateX(5deg) rotateY(-90deg)');

    pauseMusic();
    
}

/* Lifted from JavaScript PixelPounding demos from github.com/sebleedelisle */
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

var particle;

var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particles = []; 
var particleImage = new Image();
particleImage.src = 'images/ParticleSmoke.png'; 


function renderSnow() {
    
		container = document.createElement('div');

    // Added by Peter
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    
		document.body.appendChild(container);
    
		camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		camera.position.z = 1000;
    
		scene = new THREE.Scene();
		scene.add(camera);
    
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
    
		for (var i = 0; i < 250; i++) {
        
				particle = new Particle3D( material);
				particle.position.x = Math.random() * 2000 - 1000;
				particle.position.y = Math.random() * 2000 - 1000;
				particle.position.z = Math.random() * 2000 - 1000;
				particle.scale.x = particle.scale.y =  1;
				scene.add( particle );
        
				particles.push(particle); 
		}
    
    // Added by Peter
    renderer.domElement.style.position = 'absolute';

		container.appendChild( renderer.domElement );
    
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    
		setInterval( loop, 1000 / 60 );
    
}
    
function onDocumentMouseMove( event ) {
        
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
}
    
function onDocumentTouchStart( event ) {
        
		if ( event.touches.length == 1 ) {
            
				event.preventDefault();
        
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
}
    
function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {
        
				event.preventDefault();
        
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
}
    
function loop() {

		for(var i = 0; i<particles.length; i++)  {
        
				var particle = particles[i]; 
				particle.updatePhysics(); 
        
				with(particle.position) {
						if(y<-1000) y+=2000; 
						if(x>1000) x-=2000; 
						else if(x<-1000) x+=2000; 
						if(z>1000) z-=2000; 
						else if(z<-1000) z+=2000; 
				}				
		}
    
		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt(scene.position); 
    
		renderer.render( scene, camera );
    
}

    
