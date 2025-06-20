import React from 'react';
import './ModuleCommon.css';

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="about-content">
        <h1>About This Project</h1>
        
        <div className="about-text">
          <p>
            After five years of listening,reading,rereading,testing, failing, and trying to explain it to others, 
            I've realized one thing: we all learn differently. Some of us are number nerds. Some need stories. Some just want to 
            know how to keep their money safe. And most of us don't have time for a 600-page Austrian economics textbook.
          </p>

          <p>
            This is a collection of everything I wish I'd known when I started. It's built for the curious, the overwhelmed, 
            and anyone who's walked away from a Bitcoin conversation thinking, "Wait... what?"
          </p>

          <p>
            In the early days, I tried to explain Bitcoin to friends and family, only to see their eyes glaze over. I get it. 
            The concepts are deep, the jargon is ridiculous, and most content out there is either too technical, too tribal, 
            or just plain boring. So I've spent years experimenting with a better way...mixing Socratic questions, metaphors, 
            games, and real-life examples to make it click faster and stick longer.
          </p>

          <p>
            This isn't "The Truth" about Bitcoin. It's a shortcut through the jungle I already walked. And it's all open on 
            GitHub. If you see a better way to explain something, please jump in and make it better.
          </p>

          <p className="closing-message">
            Let's make Bitcoin make sense, for everyone.
          </p>
          
          <p className="signature">
            - Dalia
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 