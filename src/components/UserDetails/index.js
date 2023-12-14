import './index.css'

const UserDetails = props => {
  const {user, onDelete, showHidePassword} = props
  const {webSite, userName, password, id, bgColor} = user
  const firstLetter = userName[0].toUpperCase()
  const startPassword = showHidePassword
    ? password
    : '* '.repeat(password.length)

  const deleteButton = () => {
    onDelete(id)
  }

  console.log(startPassword)

  return (
    <li className="cart">
      <div className="user-passWord-cart">
        <div className="user-cart">
          <div className={`first-letter-logo ${bgColor}`}>
            <p className="logo">{firstLetter}</p>
          </div>
          <div>
            <p className="website">{webSite}</p>
            <p className="userName">{userName}</p>
            {showHidePassword ? (
              <p className="star-password">{startPassword}</p>
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="password-starts-image"
              />
            )}
          </div>
        </div>
        <button
          data-testid="delete"
          type="button"
          onClick={deleteButton}
          className="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default UserDetails
