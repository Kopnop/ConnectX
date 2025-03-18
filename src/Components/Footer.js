import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <footer>
            <div className='footer--div'>
            <p>made by Kopnop</p>
            <span><a href="https://github.com/Kopnop/FCC-Drum-Machine" target="_blank" rel="noreferrer"><p>view source code</p>
            <FontAwesomeIcon className="git--icon" icon={faGithub} /></a></span>
            </div>
        </footer>
    )
}
