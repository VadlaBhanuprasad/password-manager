import {Component} from 'react'
import {v4} from 'uuid'
import UserDetails from '../UserDetails'
import './index.css'

const bgColor = ['green', 'yellow', 'orange', 'blue', 'red', 'light-blue']

class PassWordManager extends Component {
  state = {
    count: 0,
    checkBox: false,
    searchInput: '',
    userList: [],
    inputWebSite: '',
    inputUserName: '',
    inputPassword: '',
  }

  onChangeWebsite = event => {
    this.setState({inputWebSite: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({inputUserName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onDeleteUserDetails = id => {
    const {userList} = this.state
    const filterAfterDelete = userList.filter(each => each.id !== id)
    this.setState({userList: filterAfterDelete})
  }

  filterUserDetails = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckBox = event => {
    this.setState(prevState => ({checkBox: !prevState.checkBox}))
  }

  addUserDetails = event => {
    event.preventDefault()

    const randomColor = bgColor[Math.ceil(Math.random() * bgColor.length)]

    const {inputWebSite, inputUserName, inputPassword} = this.state
    if (inputPassword !== '' && inputUserName !== '' && inputWebSite !== '') {
      const newUserDetails = {
        id: v4(),
        webSite: inputWebSite,
        userName: inputUserName,
        password: inputPassword,
        bgColor: randomColor,
      }
      this.setState(prevState => ({
        userList: [...prevState.userList, newUserDetails],
        inputWebSite: '',
        inputUserName: '',
        inputPassword: '',
      }))
    }
  }

  checkUserSearch = () => {
    const {searchInput, userList} = this.state
    if (searchInput !== '') {
      return 'bhau'
    }

    return userList
  }

  render() {
    const {
      count,
      searchInput,
      userList,
      inputPassword,
      inputUserName,
      inputWebSite,
      checkBox,
    } = this.state

    const filterResult = userList.filter(each =>
      each.userName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const noOfPassword = filterResult.length
    return (
      <div className="container">
        <div className="passWord-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="top-section-container">
            <div className="manager-image-cart">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-image sm-image"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-image lg-image"
              />
            </div>

            <form
              onSubmit={this.addUserDetails}
              className="add-password-container"
            >
              <h1 className="title">Add New Password</h1>
              <div className="input-image-cart">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="image-logo"
                  />
                </div>
                <input
                  placeholder="Enter Website"
                  className="input-element"
                  type="text"
                  onChange={this.onChangeWebsite}
                  value={inputWebSite}
                />
              </div>

              <div className="input-image-cart">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="image-logo"
                  />
                </div>
                <input
                  placeholder="Enter Username"
                  className="input-element"
                  type="text"
                  onChange={this.onChangeUserName}
                  value={inputUserName}
                />
              </div>

              <div className="input-image-cart">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="image-logo"
                  />
                </div>
                <input
                  placeholder="Enter Password"
                  className="input-element"
                  type="password"
                  onChange={this.onChangePassword}
                  value={inputPassword}
                />
              </div>
              <div className="btn-cart">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>

          <div className="bottom-section">
            <div className="no-of-password-and-search-input-container">
              <div className="your-password">
                <h1 className="your-password">Your Passwords </h1>
                <p className="no-of-comments your-password">
                  {filterResult.length}
                </p>
              </div>
              <div className="search-input-container">
                <div className="search-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-image"
                  />
                </div>
                <input
                  placeholder="Search"
                  type="search"
                  className="search-input"
                  onChange={this.filterUserDetails}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkBox-label-cart">
              <input
                onChange={this.onCheckBox}
                className="checkBox"
                id="checkbox"
                type="checkbox"
              />
              <label className="checkBox-label" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>

            {filterResult.length === 0 ? (
              <>
                <div className="no-passwords-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                </div>
                <p className="no-passWords">No Passwords</p>
              </>
            ) : (
              <ul className="unorder-list-container">
                {filterResult.map(eachUser => (
                  <UserDetails
                    onDelete={this.onDeleteUserDetails}
                    key={eachUser.id}
                    user={eachUser}
                    showHidePassword={checkBox}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PassWordManager
