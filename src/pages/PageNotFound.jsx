import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col items-center gap-1.5">
          <h2>404 Not Found</h2>
          <p>Halaman yang Anda cari tidak ditemukan.</p>
          <p>Silakan kembali ke halaman utama.</p>
          <Link to="/" className="btn btn-primary">
        Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;