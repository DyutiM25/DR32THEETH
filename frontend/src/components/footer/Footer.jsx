const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Clinic Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Sri Sai Super Speciality Dental Hospital</h4>
          <p>7-1-397/132, 16/B, S R Nagar Internal Rd,</p>
          <p>BK Guda, Sanjeeva Reddy Nagar,</p>
          <p>Hyderabad, Telangana 500038</p> <br />
          <p>Email: dr32teeth.com@gmail.com</p>
          <p>Phone: +91 9440061246</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#team" className="hover:underline">Our Team</a></li>
            <li><a href="#appointment" className="hover:underline">Appointment</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-col gap-4 ">
            <a href="#" className="hover:opacity-80">🌐 www.dr32teeth.com </a>
            <a href="#" className="hover:opacity-80">📷 instagram link </a>
            <a href="#" className="hover:opacity-80">📞 +91 9440061246</a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-gray-300">
        © {new Date().getFullYear()} Dr32Teeth. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
