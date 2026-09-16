import { LanguageProvider } from './context/LanguageContext'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import FloatingContact from './components/FloatingContact'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <Loader />
      <Header />
      <FloatingContact />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
