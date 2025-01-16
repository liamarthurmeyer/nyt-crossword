import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function Navigation() {

    return (
        <nav className="w-full border-b mb-4">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" className="text-lg font-semibold">
                            NYT Mini Archive
                        </Button>
                    </Link>
                    <Link href="/faq">
                        <Button variant="ghost">FAQ</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
} 