export function Progress() {
    return (
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 animate-[progress_2s_linear_infinite]"></div>
        </div>
    );
}
