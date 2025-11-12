import React, { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Cat, Github, Linkedin, Mail, Moon, SunMedium, Globe2, Code2, Sparkles, Rocket, BadgeCheck } from 'lucide-react'

const translations = {
  en: {
    nav: { about: 'About', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      badge: 'AI Full‑Stack Developer',
      title: 'Hi, I\'m Cosmic Cat',
      subtitle: 'I build intelligent, end‑to‑end experiences — from model to pixel. Futuristic UIs, robust APIs, and clever automations — purrfectly crafted.',
      ctaPrimary: 'See Projects',
      ctaSecondary: 'Get in touch'
    },
    about: {
      title: 'About',
      body:
        'I design and ship AI‑powered products that feel magical. I blend LLMs, agents, and realtime UIs with practical engineering — shipping fast without sacrificing quality.'
    },
    projects: {
      title: 'Featured Projects',
      items: [
        {
          title: 'Nebula Agent Ops',
          desc:
            'Production toolkit for orchestrating multi‑agent workflows with memory, tools, and human‑in‑the‑loop. Deployed with autoscaling and observability.',
          tags: ['Agents', 'FastAPI', 'React', 'WebSockets']
        },
        {
          title: 'CatVision Studio',
          desc:
            'Real‑time vision pipeline for product QA. Uses transformer models at the edge with smart batching and GPU inference.',
          tags: ['Vision', 'ONNX', 'Edge', 'CUDA']
        },
        {
          title: 'Starlight Chat',
          desc:
            'Multilingual chat with retrieval‑augmented generation, streaming tokens, and feedback loops — designed for scale.',
          tags: ['RAG', 'Vercel AI SDK', 'MongoDB', 'Langchain']
        }
      ]
    },
    skills: {
      title: 'Skills',
      groups: [
        { title: 'AI/ML', items: ['LLMs', 'Agents', 'Vector Search', 'Fine‑tuning', 'Prompt Engineering'] },
        { title: 'Backend', items: ['FastAPI', 'Python', 'WebSockets', 'MongoDB', 'Postgres'] },
        { title: 'Frontend', items: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Radix'] }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s build something cosmic together.',
      email: 'Email',
      socials: 'Socials'
    },
    footer: {
      love: 'Made with',
      by: 'by Cosmic Cat'
    }
  },
  fa: {
    nav: { about: 'درباره', projects: 'پروژه‌ها', skills: 'مهارت‌ها', contact: 'تماس' },
    hero: {
      badge: 'توسعه‌دهنده فول‌استک هوش مصنوعی',
      title: 'سلام، من کاسمیک کت هستم',
      subtitle:
        'تجربه‌های هوشمند از مدل تا پیکسل می‌سازم. رابط‌های آینده‌نگر، API‌های پایدار و اتوماسیون‌های هوشمند — با ظرافت گربه‌ای.',
      ctaPrimary: 'مشاهده پروژه‌ها',
      ctaSecondary: 'ارتباط بگیرید'
    },
    about: {
      title: 'درباره',
      body:
        'من محصولات مبتنی بر هوش مصنوعی می‌سازم که حس جادو دارند. با ترکیب LLMها، ایجنت‌ها و رابط‌های بلادرنگ با مهندسی عملی، سریع و باکیفیت تحویل می‌دهم.'
    },
    projects: {
      title: 'پروژه‌های منتخب',
      items: [
        {
          title: 'عامل‌اُپس نِبولا',
          desc:
            'جعبه‌ابزار تولیدی برای ارکستراسیون گردش‌کار چندعاملی با حافظه، ابزارها و تعامل انسانی — با مقیاس‌پذیری و مشاهده‌پذیری.',
          tags: ['ایجنت', 'FastAPI', 'React', 'WebSockets']
        },
        {
          title: 'CatVision Studio',
          desc:
            'خط پردازش بینایی بلادرنگ برای کنترل کیفیت. استفاده از مدل‌های ترنسفورمر در لبه با بچینگ هوشمند و استنتاج GPU.',
          tags: ['بینایی', 'ONNX', 'Edge', 'CUDA']
        },
        {
          title: 'Starlight Chat',
          desc:
            'چت چندزبانه با RAG، پخش جریانی توکن‌ها و حلقه بازخورد — مناسب مقیاس.',
          tags: ['RAG', 'Vercel AI SDK', 'MongoDB', 'Langchain']
        }
      ]
    },
    skills: {
      title: 'مهارت‌ها',
      groups: [
        { title: 'هوش مصنوعی/یادگیری ماشین', items: ['LLM', 'ایجنت', 'جستجوی برداری', 'فاین‌تیون', 'مهندسی پرامپت'] },
        { title: 'بک‌اند', items: ['FastAPI', 'پایتون', 'وب‌سوکت', 'MongoDB', 'Postgres'] },
        { title: 'فرانت‌اند', items: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Radix'] }
      ]
    },
    contact: {
      title: 'تماس',
      subtitle: 'بیایید با هم چیزی کیهانی بسازیم.',
      email: 'ایمیل',
      socials: 'شبکه‌های اجتماعی'
    },
    footer: { love: 'ساخته شده با', by: 'توسط کاسمیک کت' }
  }
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export default function App() {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => translations[lang], [lang])
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'fa' ? 'rtl' : 'ltr'
  }, [lang])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0b0b12] dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-black/30 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-500 text-white">
              <Cat className="w-5 h-5" />
            </div>
            <span className="font-semibold tracking-tight">cosmic cat</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button onClick={() => scrollTo('about')} className="hover:text-violet-600 dark:hover:text-violet-300">{t.nav.about}</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-violet-600 dark:hover:text-violet-300">{t.nav.projects}</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-violet-600 dark:hover:text-violet-300">{t.nav.skills}</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-violet-600 dark:hover:text-violet-300">{t.nav.contact}</button>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15"
              aria-label="Toggle language"
            >
              <Globe2 className="w-4 h-4" />
              <span className="text-xs">{lang === 'en' ? 'FA' : 'EN'}</span>
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero with Spline cover */}
      <section className="relative h-[80vh] w-full overflow-hidden" id="hero">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Soft gradient vignette so text is readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/0 dark:from-black/60 dark:via-black/40" />

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-white backdrop-blur">
              <Sparkles className="w-4 h-4 text-fuchsia-500" />
              <span className="text-xs font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 dark:text-white/80 max-w-xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" onClick={(e)=>{e.preventDefault();scrollTo('projects')}} className="px-5 py-2.5 rounded-md bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-500 text-white shadow hover:opacity-95">
                {t.hero.ctaPrimary}
              </a>
              <a href="#contact" onClick={(e)=>{e.preventDefault();scrollTo('contact')}} className="px-5 py-2.5 rounded-md bg-white/80 text-gray-900 backdrop-blur hover:bg-white">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.08),transparent_45%)]" />
        <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-violet-500" /> {t.about.title}
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.body}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2"><Cat className="w-4 h-4 text-pink-400" /> Cosmic aesthetics, cat‑approved UX</li>
              <li className="flex items-center gap-2"><Rocket className="w-4 h-4 text-cyan-400" /> From prototype to production, quickly</li>
              <li className="flex items-center gap-2"><Code2 className="w-4 h-4 text-violet-400" /> Type‑safe UIs, observable backends</li>
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-xl p-1 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-500">
              <div className="rounded-xl p-6 bg-white dark:bg-zinc-900">
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-300/30 to-cyan-300/30 dark:from-purple-900/40 dark:to-sky-900/40 grid place-items-center">
                  <Cat className="w-24 h-24 text-fuchsia-500" />
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">A cosmic cat keeps watch over every commit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 border-t border-black/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" /> {t.projects.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.items.map((p, i) => (
              <article key={i} className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur hover:-translate-y-0.5 transition-all">
                <div className="h-36 bg-gradient-to-tr from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 dark:from-fuchsia-500/15 dark:via-violet-500/15 dark:to-cyan-500/15" />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-violet-500" /> {t.skills.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.skills.groups.map((g, i) => (
              <div key={i} className="rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5">
                <h3 className="font-medium">{g.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {g.items.map((it, idx) => (
                    <li key={idx} className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-cyan-400" /> {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 border-t border-black/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">{t.contact.title}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">{t.contact.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:cosmic.cat@space.dev" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15">
                <Mail className="w-4 h-4" /> {t.contact.email}
              </a>
              <a href="https://github.com/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15" rel="noreferrer">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15" rel="noreferrer">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
          <form className="rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
                <input className="mt-1 w-full rounded-md bg-gray-100 dark:bg-white/10 px-3 py-2 outline-none focus:ring-2 ring-violet-400" placeholder="Luna" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
                <input className="mt-1 w-full rounded-md bg-gray-100 dark:bg-white/10 px-3 py-2 outline-none focus:ring-2 ring-violet-400" placeholder="luna@galaxy.dev" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-600 dark:text-gray-400">Message</label>
              <textarea className="mt-1 w-full rounded-md bg-gray-100 dark:bg-white/10 px-3 py-2 outline-none focus:ring-2 ring-violet-400" rows="4" placeholder="Let\'s talk about your idea..." />
            </div>
            <button type="button" onClick={()=>alert('Meow! Message portals coming soon 🐾')} className="mt-4 w-full px-4 py-2 rounded-md bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-500 text-white">
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-center items-center gap-2">
          <span>{t.footer.love}</span>
          <Cat className="w-4 h-4 text-pink-400" />
          <span>{t.footer.by}</span>
        </div>
      </footer>
    </div>
  )
}
