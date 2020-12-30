import styled from 'styled-components';

export const Container = styled.div`
    max-width: var(--container-width);
    padding: 0 15px;
    margin: 0 auto;
`;

export const Main = styled.main`
    margin: 3rem 0;
`;

export const BoxContainer = styled.div`
    box-shadow: var(--box-shadow);
    border-radius: var(--border--radius);
    background-color: var(--box--backgroundColor);
`;

export const BoxContainerTitle = styled.div`
    background-color: rgb( var(--theme-main-color) );
    padding: 1.6rem;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    color: #fff;

    h1, h2, h3 {
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-weight: bold;
    }
`;

export const BoxConatainerSmall = styled(BoxContainer)`
    width: 98%;
    max-width: 450px;
`;

export const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Padding = styled.div`
    padding: 2rem;
`;

export const PaddingLarge = styled.div`
    padding: 4rem;
`;

export const TextCenter = styled.div`
    text-align: center;
`;