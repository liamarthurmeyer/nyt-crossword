import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export function Navigation() {

    return (
        <nav className="w-full border-b">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Image
                            src="/website_logo.png"
                            alt="NYT Mini Archive"
                            width={80}
                            height={68}
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>
                    <Link href="/faq">
                        <Button variant="ghost" className="text-3xl font-semibold h-16 ">FAQ</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
} 