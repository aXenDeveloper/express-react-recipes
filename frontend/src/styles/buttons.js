import styled from 'styled-components';

export const Button = styled.button`
    display: block;
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
    font-family: inherit;
    padding: 1rem 2rem;
    border-radius: var(--border--radius);
    color: #fff !important;
    position: relative;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
    border: 0;
    background-color: ${props => {
        if (props.primary) {
            return 'rgb( var(--theme-main-color) )';
        } else if (props.success) {
            return '#267b3c';
        } else if (props.important) {
            return '#ca1e1e';
        } else if (props.important) {
            return '#e8f2fa';
        }
    }};

    &::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--button--background-hover);
        opacity: 0;
        transition: opacity .15s ease-in-out;
    }

    &:hover::after {
        opacity: 1;
    }
`;;