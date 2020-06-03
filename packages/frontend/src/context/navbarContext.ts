import { createContext } from 'react';

export interface NavbarContextProps {
  shouldShowNavbar: boolean;
  setShouldShowNavbar: (_: boolean) => void;
}

const NavbarContext = createContext<NavbarContextProps>({
  shouldShowNavbar: true,
  setShouldShowNavbar: (_) => {},
});

export default NavbarContext;
