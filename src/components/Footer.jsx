export function Footer() {
    return (
        <footer className="bg-neutral-900 text-neutral-300">
            <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-serif text-white">
                        Varenyam Cultural Club
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed">
                        Preserving and celebrating our rich cultural heritage
                        through community events, traditions, and togetherness.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-medium mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-white">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/events" className="hover:text-white">
                                Events
                            </a>
                        </li>
                        <li>
                            <a href="/gallery" className="hover:text-white">
                                Gallery
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white">
                                Contact
                            </a>
                        </li>
                         <li>
                            <a href="/yog" className="hover:text-white">
                                Yog & Wellness
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-medium mb-4">
                        Contact Us
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>Janadhar Complex, GiftCity, Gandhinagar, Gujarat</li>
                        <li>+91 97221 99270</li>
                        <li>varenyam.gnr@gmail.com</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-white font-medium mb-4">
                        Follow Us
                    </h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <a
                            href="https://www.instagram.com/varenyam.foundation/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.facebook.com/varenyamfoundation.gnr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.youtube.com/@varenyamfoundation5611"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            YouTube
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p>
                        © 2025 Varenyam Cultural Club. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="/privacy" className="hover:text-white cursor-pointer">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="hover:text-white cursor-pointer">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
