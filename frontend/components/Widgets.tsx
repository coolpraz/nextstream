const Widgets = () => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                    <h2 className="mb-4 text-xl font-semibold">
                        Widget {i + 1}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        This is a placeholder for dashboard content. You can add
                        charts, stats, or any other relevant information here.
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Widgets;
