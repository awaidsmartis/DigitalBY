'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-secondary text-white mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <span className="text-white font-black text-lg">//</span>
              </div>
              <h3 className="font-bold text-lg">Smart IS</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Transforming warehouse operations with innovative technology solutions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-white/70 hover:text-white transition-colors text-sm">Browse Catalog</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors text-sm">New Releases</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors text-sm">Enterprise</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors text-sm">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><a href="https://www.smart-is.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="https://www.smart-is.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="https://www.smart-is.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="https://www.smart-is.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="tel:+19203030470" className="hover:text-white transition-colors">+1 920 303 0470</a></li>
              <li><a href="mailto:info@smart-is.com" className="hover:text-white transition-colors">info@smart-is.com</a></li>
              <li className="text-white/70">1302 S Main St,<br />Oshkosh, WI 54902</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-secondary/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} Smart IS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="https://www.smart-is.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Smart-IS.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
