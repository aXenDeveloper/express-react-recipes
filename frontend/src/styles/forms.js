import styled from 'styled-components';
import { TextCenter } from './layout';

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    input[type="email"],
    input[type="password"],
    input[type="text"] {
        border-radius: var(--border--radius);
        padding: 1.3rem 1.2rem;
        color: inherit;
        background-color: var(--box--backgroundColor);
        border: 1px solid var(--input--border);
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

        &:focus {
            box-shadow: var(--input--border-focusShadow);
            border-color: rgb( var(--theme-main-color) );
            outline: 0;
        }
    }

    > input {
        margin-bottom: 2rem;
    }
`;

export const TextCenterForm = styled(TextCenter)`
    margin-bottom: 3rem;
    font-size: 1.6rem;
`;