import './dropdowns.scss'
export const DropDown = (props) => {
    return(
      <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
    )
}