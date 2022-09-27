// import * as React from 'react';
// export const WarningVisibility = React.createContext();

// class WarningVisibilityProvider extends React.Component {
//     state = {
//         isWarningVisible: false,
//         warningMessage: '',
//     };
//     render() {
//         return (
//             <WarningVisibility.Provider
//                 value={{
//                     isWarningVisible: this.state.isWarningVisible,
//                     warningMessage: this.state.warningMessage,
//                     toggleWarningVisibility: str =>
//                         this.setState({
//                             isWarningVisible: !this.state.isWarningVisible,
//                             warningMessage: str,
//                         }),
//                 }}
//             >
//                 {this.props.children}
//             </WarningVisibility.Provider>
//         );
//     }
// }

// export default WarningVisibilityProvider;

/**
 * todo do przemyślenie czy nie cheilibysmy mieć za jakiś czas warninga w kontekscie a nie reduxie
 */
