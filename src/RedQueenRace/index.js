import React, { useEffect } from 'react';
import './style.css';
import useWebAnimations from "@wellyshen/use-web-animations";
import aliceSprite from '../images/sprite_running-alice-queen_small.png';
import palm3 from '../images/palm3_small.png';
import palm1 from '../images/palm1_small.png';
import palm2 from '../images/palm2_small.png';
import rknight from '../images/r_knight_small.png';
import rpawn from '../images/r_pawn_small.png';
import pawnupright from '../images/r_pawn_upright_small.png';
import urook from '../images/w_rook_small.png';
import urookupright from '../images/w_rook_upright_small.png';
import bushSmall from '../images/bush_small.png';

const RedQueenRace = () => {

  let sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  let aliceSpriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
  ];


  let redQueenAlice = useWebAnimations({
    keyframes: aliceSpriteFrames,
    timing: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    }
  });


  let sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };

  let sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity
  };

  const background1 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const background2 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const foreground1 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  const foreground2 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })



  useEffect(() => {
    let sceneries = [foreground1.getAnimation(), foreground2.getAnimation(), background1.getAnimation(), background2.getAnimation()];


    var adjustBackgroundPlayback = function() {
      if (redQueenAlice.getAnimation().playbackRate < .8) {
        sceneries.forEach(function(anim) {
          anim.playbackRate = redQueenAlice.getAnimation().playbackRate/2 * -1;
        });
      } else if (redQueenAlice.getAnimation().playbackRate > 1.2) {
        sceneries.forEach(function(anim) {
          anim.playbackRate = redQueenAlice.getAnimation().playbackRate/2;
        });
      } else {
        sceneries.forEach(function(anim) {
          anim.playbackRate = 0;
        });
      }
    }
    adjustBackgroundPlayback();

    /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */
    setInterval( function() {
      /* Set decay */
      if (redQueenAlice.getAnimation().playbackRate > .4) {
        redQueenAlice.getAnimation().playbackRate *= .9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    var goFaster = function() {
      /* But you can speed them up by giving the screen a click or a tap. */
      redQueenAlice.getAnimation().playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

  }, [foreground1, foreground2, background1, background2, redQueenAlice])

  return (
    <div className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="red-queen_and_alice_sprite" ref={redQueenAlice.ref} src={aliceSprite} alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>

      <div className="scenery" id="foreground1" ref={foreground1.ref}>
        <img id="palm3" src={palm3}  alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2.ref}>
        <img id="bush" src={bushSmall} alt=" " />
        <img id="w_rook_upright" src={urookupright} alt=" " />
      </div>
      <div className="scenery" id="background1" ref={background1.ref}>
        <img id="r_pawn_upright" src={pawnupright} alt=" " />
        <img id="w_rook" src={urook} alt=" " />
        <img id="palm1" src={palm1}  alt=" " />
      </div>
      <div className="scenery" id="background2" ref={background2.ref}>
        <img id="r_pawn" src={rpawn}  alt=" " />

        <img id="r_knight" src={rknight} alt=" " />
        <img id="palm2" src={palm2} alt=" " />
      </div>
    </div>
  );
}

export default RedQueenRace;