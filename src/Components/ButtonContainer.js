import styled from 'styled-components';

export const ButtonContainer= styled.button`
text-transform: capitalize;
background: transparent;
border: 0.1rem solid var(--lightBlue);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
transition: all 0.5s ease-in-out;
margin: 0.2rem 0.5rem 0.2rem 0;
border-collapse: separate;
&:hover{
    background: var(--lightBlue);
    color: var(--darkBlue);
}
&:focus{
    outline: none;
}
`;