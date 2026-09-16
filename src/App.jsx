import { useMemo, useState } from 'react'
import './App.css'

const categories = ['כולם', "ג'ל", 'מסאז׳', 'שיער', 'פדיקור', 'טיפוח']

const businesses = [
  {
    id: 1,
    name: 'Nails by Noy',
    category: 'ג\'ל',
    rating: 4.9,
    reviews: 128,
    distance: '0.8 ק\"מ',
    wait: 'זמין עכשיו',
    price: '₪149',
    image: '✦',
    color: '#ff8ac7',
    available: ['12:30', '13:00', '15:45'],
    description: 'ג\'ל, מסגרת, עיצוב יומיומי והסרת לק בסביבה נעימה.',
  },
  {
    id: 2,
    name: 'Bloom Massage',
    category: 'מסאז׳',
    rating: 4.8,
    reviews: 212,
    distance: '1.2 ק\"מ',
    wait: 'כ-20 דק\'',
    price: '₪240',
    image: '✧',
    color: '#7db8ff',
    available: ['18:00', '18:30', '19:15'],
    description: 'מסאז\' עיסוי מקצועי, רגיעה מיידית והחזר כוח.',
  },
  {
    id: 3,
    name: 'Luna Hair Studio',
    category: 'שיער',
    rating: 4.7,
    reviews: 87,
    distance: '2.1 ק\"מ',
    wait: 'זמין מחר',
    price: '₪320',
    image: '✷',
    color: '#a7d28d',
    available: ['10:00', '11:15'],
    description: 'חיתוך, צבעים, styling וגימור מקצועי ליום מיוחד.',
  },
  {
    id: 4,
    name: 'Pure Glow',
    category: 'טיפוח',
    rating: 5.0,
    reviews: 305,
    distance: '0.5 ק\"מ',
    wait: 'זמין עכשיו',
    price: '₪180',
    image: '✹',
    color: '#f5b56a',
    available: ['14:15', '16:00', '17:30'],
    description: 'פנים, טיפולי ניקוי ומראה זוהר בלי להמתין.',
  },
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('כולם')
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0])
  const [search, setSearch] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sortBy, setSortBy] = useState('recommended')
  const [booked, setBooked] = useState(false)

  const filteredBusinesses = useMemo(() => {
    const matchingBusinesses = businesses.filter((business) => {
      const matchesCategory =
        selectedCategory === 'כולם' || business.category === selectedCategory
      const matchesSearch =
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.category.toLowerCase().includes(search.toLowerCase()) ||
        business.description.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesSearch
    })

    return [...matchingBusinesses].sort((firstBusiness, secondBusiness) => {
      if (sortBy === 'distance') {
        return parseFloat(firstBusiness.distance) - parseFloat(secondBusiness.distance)
      }

      if (sortBy === 'rating') {
        return secondBusiness.rating - firstBusiness.rating
      }

      if (sortBy === 'price') {
        return (
          parseInt(firstBusiness.price.replace(/\D/g, ''), 10) -
          parseInt(secondBusiness.price.replace(/\D/g, ''), 10)
        )
      }

      return firstBusiness.id - secondBusiness.id
    })
  }, [search, selectedCategory, sortBy])

  const handleBusinessSelect = (business) => {
    setSelectedBusiness(business)
    setSelectedTime('')
    setBooked(false)
  }

  const handleBook = () => {
    if (selectedTime) {
      setBooked(true)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">R</div>
          <div>
            <p className="eyebrow">מקום לעשייה עכשיו</p>
            <h1>ReadyToGo</h1>
          </div>
        </div>
        <button className="profile-btn" type="button" aria-label="פרופיל">
          נ
        </button>
      </header>

      <main className="page-content">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="tag">זמין היום</span>
            <h2>מצא שירות במינימום זמן, במיקום שלך.</h2>
            <p>
              תורים ריקים, רק עכשיו – בשביל לקוחות שמחפשים פתרון מיידי
              ועסקים שרוצים למלא חורים בקלות.
            </p>
          </div>

          <div className="hero-stats">
            <div>
              <strong>1,240</strong>
              <span>תורים היום</span>
            </div>
            <div>
              <strong>96%</strong>
              <span>הזמנות תוך 20 דק׳</span>
            </div>
          </div>
        </section>

        <section className="mischel-card" aria-label="ברכה ממישל">
          <img src="/mishel.jpg" alt="מישל" />
          <div>
            <h3>נוצר במיוחד ממישל לפזפזולי</h3>
          </div>
        </section>

        <label className="search-box" htmlFor="search-service">
          <span>⌕</span>
          <input
            id="search-service"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="מה תרצה לעשות עכשיו?"
          />
        </label>

        <section className="categories" aria-label="קטגוריות שירותים">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'chip active' : 'chip'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="listings-header">
          <div>
            <p className="eyebrow">מומלץ</p>
            <h3>זמינים עכשיו</h3>
          </div>
          <button
            type="button"
            className={sortBy !== 'recommended' ? 'link-btn active' : 'link-btn'}
            onClick={() => setSortBy(sortBy === 'recommended' ? 'distance' : 'recommended')}
          >
            {sortBy === 'distance' ? 'הכי קרוב' : 'סינון'}
          </button>
        </section>

        <div className="sort-options" aria-label="אפשרויות מיון">
          <button
            type="button"
            className={sortBy === 'recommended' ? 'sort-option active' : 'sort-option'}
            onClick={() => setSortBy('recommended')}
          >
            מומלץ
          </button>
          <button
            type="button"
            className={sortBy === 'distance' ? 'sort-option active' : 'sort-option'}
            onClick={() => setSortBy('distance')}
          >
            הכי קרוב
          </button>
          <button
            type="button"
            className={sortBy === 'rating' ? 'sort-option active' : 'sort-option'}
            onClick={() => setSortBy('rating')}
          >
            דירוג גבוה
          </button>
          <button
            type="button"
            className={sortBy === 'price' ? 'sort-option active' : 'sort-option'}
            onClick={() => setSortBy('price')}
          >
            מחיר נמוך
          </button>
        </div>

        <section className="cards-grid">
          {filteredBusinesses.map((business) => (
            <article
              key={business.id}
              className={
                selectedBusiness.id === business.id ? 'service-card selected' : 'service-card'
              }
              onClick={() => handleBusinessSelect(business)}
            >
              <div className="card-top">
                <div className="service-icon" style={{ background: business.color }}>
                  {business.image}
                </div>
                <div className="score-box">
                  <span>★</span>
                  {business.rating}
                </div>
              </div>

              <div className="card-body">
                <div className="service-meta">
                  <span>{business.category}</span>
                  <span>{business.distance}</span>
                </div>
                <h4>{business.name}</h4>
                <p>{business.description}</p>
              </div>

              <div className="card-footer">
                <div>
                  <strong>{business.price}</strong>
                  <small>{business.wait}</small>
                </div>
                <button type="button" className="mini-btn">
                  קבע
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="booking-panel">
          <div className="business-header">
            <div>
              <p className="eyebrow">הזמנה</p>
              <h3>{selectedBusiness.name}</h3>
            </div>
            <div className="rating-pill">★ {selectedBusiness.rating}</div>
          </div>

          <p className="business-description">{selectedBusiness.description}</p>

          <div className="time-row">
            {selectedBusiness.available.map((slot) => (
              <button
                key={slot}
                type="button"
                className={selectedTime === slot ? 'time-slot selected' : 'time-slot'}
                onClick={() => {
                  setSelectedTime(slot)
                  setBooked(false)
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="booking-summary">
            <div>
              <span>מחיר</span>
              <strong>{selectedBusiness.price}</strong>
            </div>
            <div>
              <span>זמינות</span>
              <strong>{selectedTime || 'בחר שעה'}</strong>
            </div>
          </div>

          {booked ? (
            <div className="booking-success" role="status">
              <span className="success-icon">✓</span>
              <div>
                <strong>ההזמנה נשמרה בהצלחה</strong>
                <span>
                  {selectedBusiness.name} · היום בשעה {selectedTime}
                </span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="reserve-btn"
              onClick={handleBook}
              disabled={!selectedTime}
            >
              {selectedTime ? `אישור הזמנה ל-${selectedTime}` : 'בחר שעה כדי להמשיך'}
            </button>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
