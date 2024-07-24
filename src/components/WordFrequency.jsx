import text from "./TextOfBook";
import stopWords from "./StopWords";

function getWordFrequency() {
  try {
    // حذف علائم نگارشی و تبدیل متن به آرایه‌ای از کلمات
    const words = text
      .replace(/[.,;؛،]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));
    const frequency = {};
    words.forEach((word) => {
      word = word.toLowerCase();
      frequency[word] = (frequency[word] || 0) + 1;
    });
    let frequencyArray = Object.keys(frequency).map((word) => {
      return { word: word, count: frequency[word] };
    });
    frequencyArray.sort((a, b) => b.count - a.count);
    return frequencyArray.slice(0, 80); // فقط 80 کلمه پربسامد را برگرداند
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}

export default getWordFrequency;
