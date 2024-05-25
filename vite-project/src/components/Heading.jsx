import Glowing from "./Glowing";

/* eslint-disable react/no-unknown-property */
const Heading = () => {
  return (
    <div>
      <div className="content h-auto mr-12 mt-28">
        <h1 className="title text-left ">
          SPOTON
          <div className="aurora">
            <div className="aurora__item"></div>

            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
          </div>
        </h1>
        <h1 style={{ fontSize: "200%" }}>One Stop Destination</h1>
        <br />
        <div>
          <span style={{ color: "blue" }}>Discover</span> the Magic of Soothing
          Music Welcome to our sanctuary of soothing music,
        </div>
        <p>
          {" "}
          <Glowing name="Signup" />
          <Glowing name="Learn More" />
        </p>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");

        :root {
          --bg: #000000;
          --clr-1: #00c2ff;
          --clr-2: #33ff8c;
          --clr-3: #ffc640;
          --clr-4: #e54cff;
          --blur: 1rem;
          --fs: clamp(3rem, 8vw, 7rem);
          --ls: clamp(-1.75px, -0.25vw, -3.5px);
        }

        body {
          min-height: 100vh;
          display: grid;
          background-color: var(--bg);
          color: #fff;
          font-family: "Inter", "DM Sans", Arial, sans-serif;
        }

        *,
        *::before,
        *::after {
          font-family: inherit;
          box-sizing: border-box;
        }

        .content {
          text-align: left;
        }

        .title {
          font-size: var(--fs);
          font-weight: 800;
          letter-spacing: var(--ls);
          position: relative;
          overflow: hidden;
          background: var(--bg);
          margin: 0;
        }

        .subtitle {
        }

        .aurora {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          mix-blend-mode: darken;
          pointer-events: none;
        }

        .aurora__item {
          overflow: hidden;
          position: absolute;
          width: 60vw;
          height: 60vw;
          background-color: var(--clr-1);
          border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          filter: blur(var(--blur));
          mix-blend-mode: overlay;
        }

        .aurora__item:nth-of-type(1) {
          top: -50%;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-1 5s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(2) {
          background-color: var(--clr-3);
          right: 0;
          top: 0;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-2 5s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(3) {
          background-color: var(--clr-2);
          left: 0;
          bottom: 0;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-3 3s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(4) {
          background-color: var(--clr-4);
          right: 0;
          bottom: -50%;
          animation: aurora-border 6s ease-in-out infinite,
            aurora-4 13s ease-in-out infinite alternate;
        }

        @keyframes aurora-1 {
          0% {
            top: 0;
            right: 0;
          }
          50% {
            top: 100%;
            right: 75%;
          }
          75% {
            top: 100%;
            right: 25%;
          }
          100% {
            top: 0;
            right: 0;
          }
        }

        @keyframes aurora-2 {
          0% {
            top: -50%;
            left: 0%;
          }
          60% {
            top: 100%;
            left: 75%;
          }
          85% {
            top: 100%;
            left: 25%;
          }
          100% {
            top: -50%;
            left: 0%;
          }
        }

        @keyframes aurora-3 {
          0% {
            bottom: 0;
            left: 0;
          }
          40% {
            bottom: 100%;
            left: 75%;
          }
          65% {
            bottom: 40%;
            left: 50%;
          }
          100% {
            bottom: 0;
            left: 0;
          }
        }

        @keyframes aurora-4 {
          0% {
            bottom: -50%;
            right: 0;
          }
          50% {
            bottom: 0%;
            right: 40%;
          }
          90% {
            bottom: 50%;
            right: 25%;
          }
          100% {
            bottom: -50%;
            right: 0;
          }
        }

        @keyframes aurora-border {
          0% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
          25% {
            border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
          }
          50% {
            border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
          }
          75% {
            border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
          }
          100% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
        }

        /* -- YouTube Link Styles -- */

        #source-link {
          top: 60px;
        }

        #source-link > i {
          color: rgb(94, 106, 210);
        }

        #yt-link {
          top: 10px;
        }

        #yt-link > i {
          color: rgb(219, 31, 106);
        }

        .meta-link {
          align-items: center;
          backdrop-filter: blur(3px);
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          display: inline-flex;
          gap: 5px;
          left: 10px;
          padding: 10px 20px;
          position: fixed;
          text-decoration: none;
          transition: background-color 600ms, border-color 600ms;
          z-index: 10000;
        }

        .meta-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .meta-link > i,
        .meta-link > span {
          height: 20px;
          line-height: 20px;
        }

        .meta-link > span {
          color: white;
          font-family: "Rubik", sans-serif;
          transition: color 600ms;
        }
      `}</style>
    </div>
  );
};

export default Heading;
