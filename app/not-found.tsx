import Link from "next/link";

/* 404: the rickshaw broke down. (Drop in rickshaw-breakdown art later; this uses the existing rickshaw.) */
export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf-inner">
        <div className="nf-code" aria-hidden="true">404</div>
        <div className="nf-rick" aria-hidden="true">
          <span className="nf-smoke" />
          <span className="nf-smoke nf-smoke-2" />
          <img src="/img/rickshaw-body.webp" alt="" width={1032} height={708} />
        </div>
        <h1 className="page-h1">Arre! <span className="red">Wrong turn.</span></h1>
        <p className="lead">This road doesn&apos;t go anywhere. Our rickshaw got a flat tyre looking for it. Let&apos;s get you back on the map.</p>
        <div className="hero-ctas-left nf-ctas">
          <Link href="/" className="btn btn-red btn-lg">Back to the road ↗</Link>
          <Link href="/services" className="btn btn-yellow btn-lg">See all 7 shops</Link>
        </div>
      </div>
      <div className="signposts-road nf-road" aria-hidden="true" />
    </main>
  );
}
