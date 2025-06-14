module.exports = function calculateReadingTime(text) {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTimeInMinutes} min read`;
}