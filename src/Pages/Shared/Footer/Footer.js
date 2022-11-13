import React from "react";
import { Link } from "react-router-dom";
import footer from "../../../assets/images/footer.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <section
      className="mt-8"
      style={{
        background: `url(${footer})`,
        backgroundSize: "cover",
      }}
    >
      <footer className=" p-10  ">
        <div className="footer">
          <div>
            <span className="footer-title">Services</span>
            <Link to="" className="link link-hover">
              Branding
            </Link>
            <Link to="" className="link link-hover">
              Design
            </Link>
            <Link to="" className="link link-hover">
              Marketing
            </Link>
            <Link to="" className="link link-hover">
              Advertisement
            </Link>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <Link to="" className="link link-hover">
              About us
            </Link>
            <Link to="" className="link link-hover">
              Contact
            </Link>
            <Link to="" className="link link-hover">
              Jobs
            </Link>
            <Link to="" className="link link-hover">
              Press kit
            </Link>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <Link to="" className="link link-hover">
              Terms of use
            </Link>
            <Link to="" className="link link-hover">
              Privacy policy
            </Link>
            <Link to="" className="link link-hover">
              Cookie policy
            </Link>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>Copyright © {year} - All right reserved</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
