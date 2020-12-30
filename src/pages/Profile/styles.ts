import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    justify-content: center;
    padding: 0 30px 140px;
`;

export const Title = styled.Text ` 
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 24px 0;
`;
export const UserAvatarButton = styled.TouchableOpacity `
    margin-top: 64px;
`;
export const UserAvatar = styled.Image ` 
    width: 186px;
    height: 186px;
    border-radius: 98px;
    margin-top: 64px;
    left: 40px;
 `;
export const BackButton = styled.TouchableOpacity ` 
    /* position: absolute;
    top: 64px;
    left: 24px; 
    opacity: 1; */
    top: 135px;
    right: 10px;
`;
export const HeaderProfile = styled.View ` 
    flex-direction: row;
 `;
