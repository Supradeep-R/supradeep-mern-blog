import React from 'react';
import {
  Footer,
  FooterBrand,
  FooterDivider,
  FooterLink,
} from "flowbite-react";
import { BsLinkedin, BsGithub, BsInstagram, BsPhone, BsEnvelope, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';

const FooterComp = () => {
  return (
    <div>
      <Footer container>
        <div className="w-full">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <Link
              to='/'
              alt="Supradeep's Blog Logo"
              name="Supradeep's Blog"
              className='text-lg font-extrabold font-Poppins mb-4 sm:mb-0'
            >
              Supradeep's Blog
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 list-none">
              <FooterLink href="https://www.linkedin.com/in/supradeep-revuru/" target="_blank" className="list-none">
                <BsLinkedin className="inline-block mr-2" /> LinkedIn
              </FooterLink>
              <FooterLink href="https://github.com/Supradeep-R" target="_blank" className="list-none">
                <BsGithub className="inline-block mr-2" /> GitHub
              </FooterLink>
              {/* <FooterLink href="https://www.instagram.com" target="_blank" className="list-none">
                <BsInstagram className="inline-block mr-2" /> Instagram
              </FooterLink> */}
              {/* <FooterLink href="https://www.twitter.com" target="_blank" className="list-none">
                <BsTwitter className="inline-block mr-2" /> Twitter
              </FooterLink> */}
              <FooterLink href="tel:6302268257" className="list-none">
                <BsPhone className="inline-block mr-2" /> Phone
              </FooterLink>
              <FooterLink href="mailto:revuru.supradeep@gmail.com" className="list-none">
                <BsEnvelope className="inline-block mr-2" /> revuru.supradeep@gmail.com
              </FooterLink>
            </div>
          </div>
          <FooterDivider />
        </div>
      </Footer>
    </div>
  );
}

export default FooterComp;
