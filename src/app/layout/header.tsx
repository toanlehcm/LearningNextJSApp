import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__dropdown'>
        <select>
          <option>WNE Building</option>
          {/* Add dynamic options */}
        </select>
      </div>
      <div className='header__dropdown'>
        <select>
          <option>Household</option>
          {/* Add dynamic options */}
        </select>
      </div>
      <div className='header__search'>
        <input type='text' placeholder='Search by household code' />
        <button>🔍</button>
      </div>
      <div className='header__icons' style={{ display: 'flex' }}>
        <button>🔔</button>
        <button>👤</button>
        <LocaleSwitcher />
      </div>
    </header>
  )
}
