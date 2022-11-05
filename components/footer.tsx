import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

const Footer =()=>{
    const { t }: { t: any } = useTranslation(['common', 'button']);
    return(
        <footer>
            <div></div>
        </footer>
    )
}
export default Footer;