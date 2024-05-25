import { HeaderMobile } from "./HeaderMobile";
import { HeaderWeb } from "./HeaderWeb";

export function Header(): React.ReactNode {
    return (
        <>
            <HeaderWeb />
            <HeaderMobile />
        </>
    );
}
