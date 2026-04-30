import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="text-white font-bold text-xl mb-4">Élume</p>
            <p className="text-sm leading-relaxed">
              Curated minimal fashion and lifestyle products for intentional living.
            </p>
          </div>
          {[
            { title: 'Shop',    links: [{ href: '/products', label: 'All Products' }] },
            { title: 'Info',    links: [{ href: '#',         label: 'About'        },
                                        { href: '#',         label: 'Contact'      }] },
            { title: 'Legal',   links: [{ href: '#',         label: 'Privacy'      },
                                        { href: '#',         label: 'Terms'        }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href}
                      className="text-sm hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row
                        items-center justify-between gap-4 text-xs">
          <p>© 2026 Élume. Built with Next.js by Alina Gordiy.</p>
          <a
            href="https://github.com/alinagordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub →
          </a>
        </div>
      </div>
    </footer>
  );
}