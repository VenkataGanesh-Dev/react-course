export function formatMoney(amountCents) {
  // Yes! Template strings and template literals are the same thing. Both names refer to the same JavaScript feature.
  //  Template literals are a way to create strings in JavaScript using backticks (`) instead of single quotes (' ') or double quotes (" ").
  // in template string to insert something,  We need ${}
  // This is called a template literal.
  // - Backticks ` ` allow us to write template literals.
  // - $ displays the dollar symbol.
  // - ${} allows us to insert a JavaScript expression inside a string.
  // So this function lets us convert any amount cents into this format. At the end, return this value from the function
  `$${(amountCents / 100).toFixed(2)}`;
}
