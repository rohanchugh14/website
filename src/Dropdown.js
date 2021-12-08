import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton,
} from "./styles.js";

// const Dropdown = (props) => {
//   return (
//     <div>
//       <DropdownWrapper action={props.action}>
//         <StyledLabel htmlFor="services">{props.formLabel}</StyledLabel>
//         <StyledSelect id="services" name="services">
//           {props.children}
//         </StyledSelect>
//         <StyledButton type="submit" value={props.buttonText} />
//       </DropdownWrapper>
//     </div>
//   );
// };

// const Option = (props) => {
//     return (
//         <StyledOption selected={props.selected}>
//             {props.value}
//         </StyledOption>
//     )
// }
// export default {Dropdown, Option};

export function Dropdown(props) {
    return (
      <DropdownWrapper action={props.action}>
        <StyledLabel htmlFor="services">
          {props.formLabel}
        </StyledLabel>
        <StyledSelect id="services" name="services">
          {props.children}
        </StyledSelect>
        <StyledButton type="submit" value={props.buttonText} />
      </DropdownWrapper>
    );
  }
  
  export function Option(props) {
    return (
      <StyledOption value={props.value} selected={props.selected}>
        {props.text}
      </StyledOption>
    );
  }
// export default Dropdown, Option;
