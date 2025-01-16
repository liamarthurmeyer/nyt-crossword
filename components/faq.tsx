export function FAQ() {
    return (
        <div className="container mx-auto max-w-2xl space-y-8">
            <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">What is the NYT Mini Crossword?</h2>
                    <p>The Mini is a daily 5x5 crossword puzzle published by the New York Times, designed to be completed in just a few minutes.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">When do new puzzles become available?</h2>
                    <p>New Mini puzzles are released at 10 PM Eastern Time the night before their publish date, except for Sunday's puzzle which releases at 6 PM Eastern Time on Saturday.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">How does this archive work?</h2>
                    <p>This tool helps you track which Mini puzzles you've completed. Click any date to open that day's puzzle, and it will automatically be marked as completed.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Do I need a NYT subscription?</h2>
                    <p>No! The Mini Crossword is free to play for everyone.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">How do I track my progress?</h2>
                    <p>Your completed puzzles are automatically saved in your browser. You can export your progress from the Settings menu to transfer it between devices.</p>
                </section>
            </div>
        </div>
    );
} 