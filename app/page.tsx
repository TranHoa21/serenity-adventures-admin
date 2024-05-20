import Link from 'next/link';
import "./style.scss";
export default function Home() {
  return (

    <div className="page-container">
      <div className="title-page"><em>Wellcome to Admin page with Tran Hoa</em></div>
      <Link href="/login" className="page-Link">
        <button className="btn-page">Login</button>
      </Link>
    </div>

  );
}
