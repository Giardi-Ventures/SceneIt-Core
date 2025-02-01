// 📌 Import necessary modules (Node.js environment for testing)
import * as readlineSync from "readline-sync";
import { randomUUID } from "crypto";

// 📌 Define Book Type
type Book = {
  id: string;
  title: string;
  relativeScore: number; // Internal score (0-5000)
  comparisons: number; // Number of times compared
  displayScore: number; // Normalized score (1-10)
};

// 📌 Book Library
const books: Book[] = [];

/**
 * 📌 Add a new book & dynamically adjust its ranking through comparisons.
 */
function addBook(title: string, feedback: "dislike" | "like" | "love") {
  console.log(`Adding book: ${title} with feedback: ${feedback}`);
  let initialScore: number;
  switch (feedback) {
    case "dislike":
      initialScore = 2000;
      break;
    case "like":
      initialScore = 3000;
      break;
    case "love":
      initialScore = 4000;
      break;
    default:
      initialScore = 3000;
  }

  const newBook: Book = {
    id: randomUUID(),
    title,
    relativeScore: initialScore,
    comparisons: 0,
    displayScore: initialScore / 500,
  };

  books.push(newBook);
  console.log(`Book added:`, newBook);
  if (books.length > 1) {
    updateBookRanking(newBook);
  } else {
    console.log("Not enough books for comparison yet.");
  }
}

/**
 * 📌 Dynamically select books for comparison.
 */
function getBooksForComparison(newBook: Book, count: number): Book[] {
  console.log(`Selecting ${count} books for comparison with: ${newBook.title}`);
  const availableBooks = books.filter(book => book.id !== newBook.id);
  if (availableBooks.length === 0) {
    console.log("No books available for comparison.");
    return [];
  }

  const tierBooks = availableBooks
    .sort((a, b) => a.comparisons - b.comparisons) // Fewest comparisons first
    .sort((a, b) => Math.abs(newBook.relativeScore - a.relativeScore) - Math.abs(newBook.relativeScore - b.relativeScore)) // Closest scores
    .slice(0, count);

  console.log(`Selected books for comparison:`, tierBooks.map(b => b.title));
  return tierBooks;
}

/**
 * 📌 Compare two books & adjust scores dynamically.
 */
function compareBooks(
  newBook: Book,
  comparedBook: Book,
  result: "better" | "worse" | "tied"
): void {
  console.log(`Comparing: ${newBook.title} vs ${comparedBook.title} - Result: ${result}`);
  const baseAdjustment = 50;
  const adjustmentFactor = 1 / (1 + Math.max(newBook.comparisons, comparedBook.comparisons));
  const adjustment = baseAdjustment * adjustmentFactor;

  if (result === "better") {
    newBook.relativeScore += adjustment;
    comparedBook.relativeScore -= adjustment;
  } else if (result === "worse") {
    newBook.relativeScore -= adjustment;
    comparedBook.relativeScore += adjustment;
  }

  newBook.comparisons++;
  comparedBook.comparisons++;
  console.log(`Updated scores - ${newBook.title}: ${newBook.relativeScore}, ${comparedBook.title}: ${comparedBook.relativeScore}`);
}

/**
 * 📌 Normalize scores dynamically to a 1-10 scale.
 */
function normalizeScores(): void {
  if (books.length === 0) return;
  console.log("Normalizing scores...");

  const minScore = Math.min(...books.map(book => book.relativeScore));
  const maxScore = Math.max(...books.map(book => book.relativeScore));

  books.forEach(book => {
    book.displayScore =
      1 + ((book.relativeScore - minScore) * 9) / (maxScore - minScore);
  });
  console.log("Scores normalized:", books.map(b => ({ title: b.title, score: b.displayScore })));
}

/**
 * 📌 Rank a book dynamically by refining comparisons in multiple passes.
 */
function updateBookRanking(newBook: Book) {
  console.log(`Updating ranking for: ${newBook.title}`);
  let comparisonRounds = 3; // Start with broad comparisons

  while (comparisonRounds > 0) {
    const availableBooks = books.filter(book => book.id !== newBook.id);
    if (availableBooks.length < 2) {
      console.log("Not enough books for meaningful comparisons. Skipping...");
      break;
    }

    const comparisonCount = Math.min(availableBooks.length, Math.ceil(Math.sqrt(books.length) * (4 - comparisonRounds))); // Ensure valid count
    console.log(`Comparison round ${4 - comparisonRounds}, selecting ${comparisonCount} books...`);

    const booksToCompare = getBooksForComparison(newBook, comparisonCount);

    booksToCompare.forEach(comparedBook => {
      const result = readlineSync.question(
        `Is "${newBook.title}" better, worse, or tied with "${comparedBook.title}"? (better/worse/tied) `
      ) as "better" | "worse" | "tied";

      compareBooks(newBook, comparedBook, result);
    });

    comparisonRounds--;
  }

  normalizeScores();
}

/**
 * 📌 Example Books for Testing
 */
function runTest() {
  console.log("\n📚 Adding Sample Books...\n");

  addBook("The Hobbit", "like");
  addBook("Dune", "love");
  addBook("Twilight", "dislike");
  addBook("1984", "like");
  addBook("Harry Potter", "love");
  addBook("Pride and Prejudice", "like");
  addBook("Moby Dick", "dislike");
  addBook("The Great Gatsby", "like");

  console.log("\n📊 Final Ranked Books:\n", books);
}

// 📌 Run the test
runTest();
