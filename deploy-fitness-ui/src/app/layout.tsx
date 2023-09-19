import { FC } from 'react';
import '/app/globals.css'; 
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'; 

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 20px' }}>
        
        {/* Logo */}
        <img src="/logofitness.JPG" alt="Logo" style={{ width: '150px', height: 'auto' }} />

        
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList style={{ paddingTop: '5px' }}>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                About Us
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Content specific to About Us */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem style={{ marginLeft: '20px' }}>
              <NavigationMenuTrigger>
                Contact Us
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Content specific to Contact Us */}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="container" style={{ padding: '0 15px' }}>
        {children}
      </div>
    </>
  );
};

export default RootLayout;
