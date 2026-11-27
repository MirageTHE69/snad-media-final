"use client";

import { useState } from "react";
import Link from "next/link";
import PosterCard from "./PosterCard";
import { CASE_STUDIES, GENRES } from "@/lib/cases";

/* Genre filter + poster wall. */
export default function WorkGrid() {
  const [genre, setGenre] = useState("All");
  const list = CASE_STUDIES.filter((c) => genre === "All" || c.genre === genre);
  return (
    <>
      <div className="genres" role="group" aria-label="Filter by genre">
        {GENRES.map((g) => (
          <button key={g} type="button" aria-pressed={genre === g} className={`tchip ${genre === g ? "is-on tchip-yellow" : ""}`} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
      <div className="film-wall">
        {list.map((c, i) => <PosterCard key={c.slug} c={c} reveal={i * 90} />)}
        <Link href="/contact" className="film-poster film-next" data-reveal={list.length * 90}>
          <div className="film-art film-art-empty">
            <span className="film-next-tag">Coming soon</span>
            <b>Your brand’s blockbuster</b>
            <small>Starring: you. Directed by: SNAD.</small>
            <span className="btn btn-yellow">Book the premiere ↗</span>
          </div>
        </Link>
      </div>
    </>
  );
}
