import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const bookingEmail = import.meta.env.VITE_BOOKING_EMAIL?.trim()
const images = import.meta.env.BASE_URL + 'images/'

function localDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return [year, month, day].join('-')
}

function nextDay(value) {
  if (!value) return undefined
  const [year, month, day] = value.split('-').map(Number)
  return localDate(new Date(year, month - 1, day + 1))
}

function BookingForm() {
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')

  function prepareRequest(event) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const labels = {
      name: 'Name', email: 'E-Mail', arrival: 'Anreise',
      departure: 'Abreise', guests: 'Gäste', message: 'Nachricht',
    }
    const lines = Object.entries(labels).map(([key, label]) =>
      label + ': ' + String(fields.get(key)).trim()
    )
    setDraft(lines.join('\n'))
    setStatus('')
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft)
      setStatus('Anfrage kopiert.')
    } catch {
      setStatus('Bitte markieren und kopieren Sie den Text im Feld.')
    }
  }

  return (
    <form onSubmit={prepareRequest}>
      <div className="form-grid">
        <label>Name<input name="name" autoComplete="name" required maxLength="100" /></label>
        <label>E-Mail<input name="email" type="email" autoComplete="email" required maxLength="254" /></label>
        <label>Anreise<input name="arrival" type="date" min={localDate()} value={arrival} onChange={(event) => {
          const date = event.target.value
          setArrival(date)
          if (departure && departure <= date) setDeparture('')
        }} required /></label>
        <label>Abreise<input name="departure" type="date" min={nextDay(arrival || localDate())} value={departure} onChange={(event) => setDeparture(event.target.value)} required /></label>
        <label>Gäste<input name="guests" type="number" min="1" defaultValue="2" required /></label>
        <label className="wide">Nachricht <span>(optional)</span><textarea name="message" rows="3" maxLength="1000" /></label>
      </div>
      <button className="button" type="submit">Anfrage vorbereiten</button>
      {draft && (
        <div className="draft">
          <label>Anfrageentwurf<textarea value={draft} readOnly rows="7" /></label>
          {bookingEmail
            ? <a href={'mailto:' + bookingEmail + '?subject=' + encodeURIComponent('Buchungsanfrage – Hotel Atiokeng Palace') + '&body=' + encodeURIComponent(draft)}>Im E-Mail-Programm öffnen</a>
            : <button className="copy" type="button" onClick={copyDraft}>Anfrage kopieren</button>}
        </div>
      )}
      <p role="status" className="status">{status}</p>
    </form>
  )
}

function App() {
  return (
    <>
      <a className="skip" href="#inhalt">Zum Inhalt</a>
      <header className="header">
        <a className="brand" href="#start">Atiokeng <span>Palace</span></a>
        <nav aria-label="Hauptnavigation">
          <a href="#hotel">Hotel</a>
          <a href="#restaurant">Restaurant</a>
          <a className="nav-book" href="#buchung">Buchung</a>
        </nav>
      </header>
      <main id="inhalt">
        <section className="hero" id="start">
          <img src={images + 'hotel.jpg'} alt="" fetchPriority="high" />
          <div className="hero-content">
            <p className="eyebrow">Hotel &amp; Restaurant</p>
            <h1>Hotel<br />Atiokeng Palace</h1>
            <p>In Ruhe ankommen. Den Aufenthalt genießen.</p>
            <a className="button" href="#buchung">Aufenthalt anfragen <span aria-hidden="true">↗</span></a>
            <small>Symbolfoto</small>
          </div>
        </section>
        <div className="features">
          <section className="feature" id="hotel">
            <figure><img src={images + 'room.jpg'} alt="Beispiel eines Hotelzimmers" loading="lazy" /><figcaption>Symbolfoto</figcaption></figure>
            <div><p className="eyebrow">Hotel</p><h2>Zeit zum Ankommen</h2><p>Ob für eine kurze Reise oder einen längeren Aufenthalt, teilen Sie uns Ihre Reisedaten und Wünsche über das Anfrageformular mit.</p><a href="#buchung">Zimmer anfragen <span aria-hidden="true">↗</span></a></div>
          </section>
          <section className="feature reverse" id="restaurant">
            <figure><img src={images + 'restaurant.jpg'} alt="Beispiel eines gedeckten Restaurantbereichs" loading="lazy" /><figcaption>Symbolfoto</figcaption></figure>
            <div><p className="eyebrow">Restaurant</p><h2>Gemeinsam genießen</h2><p>Entdecken Sie das Restaurant des Atiokeng Palace. Fragen zur Speisekarte oder zu einem geplanten Besuch können Sie Ihrer Nachricht hinzufügen.</p><a href="#buchung">Anfrage vorbereiten <span aria-hidden="true">↗</span></a></div>
          </section>
        </div>
        <section className="booking" id="buchung">
          <div className="booking-inner">
            <div><p className="eyebrow">Reservierung</p><h2>Ihr Aufenthalt beginnt hier</h2><p>{bookingEmail ? 'Bereiten Sie Ihre Anfrage vor und öffnen Sie sie anschließend in Ihrem E-Mail-Programm.' : 'Das Formular erstellt einen Entwurf, den Sie kopieren können. Der Versand ist noch nicht eingerichtet.'}</p></div>
            <BookingForm />
          </div>
        </section>
      </main>
      <footer><a className="brand" href="#start">Atiokeng <span>Palace</span></a><p>Hotel &amp; Restaurant</p></footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
