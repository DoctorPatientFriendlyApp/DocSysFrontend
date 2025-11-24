import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import HideButton from "../components/Hide/HideButton";
import PublicNav from "../components/NavBars/PublicNav";



// Add your doctor-themed images here
const IMAGES = [
  "/doctor1.png",
  "/doctor2.png",
  "/doctor3.png",
  "/doctor4.png",
  "/doctor5.png",
  "/doctor6.png",
  "/doctor7.png",
];

const TAGLINES = [
  "Advanced digital clinic for every doctor.",
  "Manage patients, reports & treatments easily.",
  "Track medical history with full accuracy.",
  "Secure, fast & efficient patient care system.",
];

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
   const [showAbout, setShowAbout] = useState(true);

  useEffect(() => {
    const id = setInterval(
      () => setBgIndex((s) => (s + 1) % IMAGES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="position-relative w-100 min-vh-100 overflow-hidden font-sans pt-5">

    <PublicNav /> 
    
      {/* Animations */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeZoom {
          0% { opacity: 0; transform: translateY(-40px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeZoom { animation: fadeZoom 1.2s ease-out forwards; }
      `}</style>

      {/* Background Slider */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {IMAGES.map((src, i) => {
          const isActive = i === bgIndex;
          return (
            <img
              key={src}
              src={src}
              alt="doctor-bg"
              className={`position-absolute top-0 start-0 w-100 h-100 object-fit-cover transition-opacity img-fluid ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: "opacity 1s ease-in-out" }}
            />
          );
        })}

        {/* Gradient Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,41,70,0.55), rgba(5,25,45,0.35), rgba(255,255,255,0.05))",
          }}
        />
      </div>

      {/* Main Section */}
      <main className="position-relative animate-fadeZoom z-2 pt-5 pt-md-5">
        <div className="container py-5">
          <div className="row align-items-center gy-5">

     {/* LEFT SECTION */}
           
            <div className="col-12 col-md-8 text-center text-md-start">
              <h1
                className="fw-bold display-4 display-md-2"
                style={{
                  color: "#A5D8FF",
                  textShadow: "4px 6px 20px rgba(0,0,0,0.6)",
                }}
              >
                Doctor Panel
              </h1>

              {/* Typing Effect */}
              <div className="mt-3">
                <TypingText
                  phrases={TAGLINES}
                  typingSpeed={55}
                  deletingSpeed={35}
                  pause={1400}
                  className="fs-5 fs-md-3 text-white"
                />
              </div>

              {/* Search Bar */}
              <div className="mt-4 d-flex justify-content-center justify-content-md-start">
                <div className="position-relative w-100" style={{ maxWidth: "450px" }}>
                  <input
                      className="form-control rounded-pill px-4 py-3 shadow-lg border-0"
                      style={{
                        backgroundColor: "#ffffff",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#000",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                      }}
                      placeholder="Search Hospitals, Doctors, Departments..."
                    />

                  <button
                    className="btn position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "48px", height: "48px", background: "#0D3B66", color: "#fff" }}
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>
            </div>
      {/* RIGHT SIDE — ABOUT SECTION */}
                {showAbout && (
                  <div className="col-12 col-md-4">
                    <div
                      className="p-4 rounded-4 shadow-lg bg-white bg-opacity-50 backdrop-blur-lg animate-fadeIn"
                      style={{
                        border: "1px solid rgba(255,255,255,0.4)",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(240,248,255,0.6))",
                        boxShadow:
                          "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(13,110,253,0.15)",
                        transform: "translateY(0)",
                        animation: "slideUp 0.5s ease",
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="me-3 p-2 rounded-circle"
                          style={{
                            background: "rgba(13,110,253,0.15)",
                            boxShadow: "0 0 8px rgba(13,110,253,0.35)",
                          }}
                        >
                          <i className="bi bi-heart-pulse-fill text-primary fs-4"></i>
                        </div>

                        <h3 className="fw-bold text-primary mb-0 fs-4">
                          Doctor–Patient System
                        </h3>
                      </div>

                      <p className="text-dark small mb-4 lh-base">
                        A modern digital healthcare platform that helps doctors manage patient
                        profiles, medical histories, diagnoses, treatments, reports, and
                        follow-ups — securely and efficiently.
                      </p>

                      {/* Buttons */}
                      <div className="d-flex gap-3 mb-3">
                        <button
                          className="btn btn-primary w-100 fw-semibold rounded-pill shadow-sm"
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Learn More
                        </button>
                        <button
                          className="btn btn-outline-primary w-100 fw-semibold rounded-pill"
                          style={{
                            borderWidth: "2px",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Start
                        </button>
                      </div>

                      {/* Toggle Button Inside Card */}
                      <div className="text-center mt-2">
                        <HideButton showAbout={showAbout} setShowAbout={setShowAbout} />
                      </div>
                    </div>
                  </div>
                )}

                 {/* OUTSIDE CARD — WHEN CLOSED  */}
                {!showAbout && (
                  <div className="text-right mt-10 animate-fadeIn">
                    <HideButton showAbout={showAbout} setShowAbout={setShowAbout} />
                  </div>
                )}
          </div> 
        </div> 
      </main>
      
    </div>
  );
}

/* ------------------------ */
/* TYPING EFFECT COMPONENT  */
/* ------------------------ */
function TypingText({
  phrases = [],
  typingSpeed = 60,
  deletingSpeed = 40,
  pause = 1200,
  className = "",
}) {
  const [txt, setTxt] = useState("");
  const [index, setIndex] = useState(0);
  const [del, setDel] = useState(false);
  const timeout = useRef(null);

  useEffect(() => clearTimeout(timeout.current), []);

  useEffect(() => {
    const word = phrases[index] || "";
    if (!del) {
      if (txt.length < word.length) {
        timeout.current = setTimeout(() => setTxt(word.slice(0, txt.length + 1)), typingSpeed);
      } else {
        timeout.current = setTimeout(() => setDel(true), pause);
      }
    } else {
      if (txt.length > 0) {
        timeout.current = setTimeout(() => setTxt(word.slice(0, txt.length - 1)), deletingSpeed);
      } else {
        setDel(false);
        setIndex((p) => (p + 1) % phrases.length);
      }
    }
  }, [txt, del, index]);

  return (
    <div className={className}>
      <span>{txt}</span>
      <span style={{ marginLeft: 4, animation: "blink 1s infinite" }}>█</span>
    </div>
  );
}
