export function FAQ() {
    return (
        <div className="container mx-auto max-w-2xl space-y-8">
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">About the Creator</h2>
                    <p>This tool was made by Liam Meyer. I wanted to find a way to access past puzzles of my favorite crossword (the Mini), and stumbled upon the puzzles being publicly available, but with no way to access them besides using a direct link or paying for an NYT subscription. I made this tool to automate that process for myself and others who also love the Mini! I am currently looking for an entry level SWE job, if you know of an opportunity, would like to introduce someone to me, or just want to chat. You can reach me at <a href="mailto:xliamameyerx@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">xliamameyerx@gmail.com</a> or on <a href="https://www.linkedin.com/in/liam-a-meyer/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>. You can also view my <a href="https://docs.google.com/document/d/1MjtBFFvgCwCFrBXE3LxPrs1PyevZrTI1pjaFbxBxVps/edit?usp=sharing" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">resume</a>.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Do I need a NYT subscription?</h2>
                    <p>No! With this website, all past Minis are free to play for everyone.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">How do I track my progress?</h2>
                    <p>Your completed puzzles are automatically saved in your browser when you open them. Previously completed puzzles outside of the website, or puzzles that you navigate to directly will not be tracked. You can export your progress from the Settings menu to transfer it between devices.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">How does this archive work?</h2>
                    <p>This tool redirects you by navigating directly to the Mini of the date you click. Click any date to open that day&apos;s puzzle, and it will open and automatically be marked as completed.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Would this work for other NYT games like Connections?</h2>
                    <p>No, since the Mini was created long before the other games, it was implemented differently and hosted in a different section of the NYT website, which you can tell by the urls. nytimes.com/crosswords/game/mini (nyt =&gt; crosswords =&gt; game =&gt; mini) vs nytimes.com/games/connections (nyt =&gt; games =&gt; connections). Because of this, you cannot access past puzzles of other games from their URL without a subscription.</p>
                </section>

            </div>
        </div>
    );
} 