function TokenData(name, start, end, data) {

    return {
        name,
        start,
        end,
        data
    };

}

function getKeywordName(keyword) {

    return `${keyword.toUpperCase().replace(/ /g, '_')}_KEYWORD`

}

function getSymbolName(symbol) {

    return `${symbol.toUpperCase().replace(/ /g, '_')}`;

}

function tokenizer(input, langFile) {

    if (langFile == undefined) return [];

    let keywords = langFile.syntax?.tokens?.keywords || [];
    let symbols = langFile.syntax?.tokens?.symbols || [];
    let spans = langFile.syntax?.tokens?.spans || [];

    keywords = keywords.sort((a, b) => b.activator.length - a.activator.length)

    const output = [];

    // Loop through the characters
    let i = 0;
    while (i < input.length) {
    
        // Loop through each keyword
        for (var keyword of keywords) {

            // Create incrementor and matching bool
            let j = 0;
            let matching = true;

            // Loop through each character
            do {

                if (i + j >= input.length || j >= keyword.activator.length) {
                    matching = false;
                    break;
                }
                
                if (input[i + j] != keyword.activator[j]) matching = false;
                j++;

            } while (j < keyword.activator.length && matching);

            // Check if Matching
            if (matching) {

                output.push(TokenData(getKeywordName(keyword.activator), i, i + j, input.substring(i, i + j)));
                i += j;
                
            }

        }

        // Loop through each symbol
        for (var symbol of symbols) {

            // Create incrementor and matching bool
            let j = 0;
            let matching = true;

            // Loop through each character
            do {

                if (i + j >= input.length || j >= symbol.activator.length) {
                    matching = false;
                    break;
                }

                if (input[i + j] != symbol.activator[j]) matching = false;
                j++;

            } while (j < symbol.activator.length && matching);

            // Check if Matching
            if (matching) {

                output.push(TokenData(getSymbolName(symbol.name), i, i + j, input.substring(i, i + j)));
                i += j - 1;
            
            }

        }

    //   // Loop through each span and see if the text is matching
    //   for (var span in spans) {
    //     if (span.usesStartAndEnd()) {
    //       // Create incrementor and matching bool
    //       int j = 0;
    //       bool matching = true;

    //       // Loop through each character
    //       do {
    //         if (i + j >= input.length || j >= span.start.length) {
    //           matching = false;
    //           break;
    //         }
    //         if (input[i + j] != span.start[j]) matching = false;
    //         j++;
    //       } while (j < span.start.length && matching);

    //       if (matching) {
    //         i += j - 1;
    //         j = 0;
    //         int endMatchAmount = 0;

    //         // Now its time to find the end of the span
    //         do {
    //           if (input[i + j] == span.end[endMatchAmount]) {
    //             endMatchAmount++;
    //           } else {
    //             endMatchAmount = 0;
    //           }
    //           j++;
    //         } while (i + j < input.length && endMatchAmount < span.end.length);

    //         if (endMatchAmount == span.end.length) {
    //           output.add(
    //             TokenData(
    //               span.getTokenName(),
    //               (i - 1) + span.start.length,
    //               (i + j) - span.end.length,
    //               input.substring(
    //                 (i - 1) + span.start.length,
    //                 (i + j) - span.end.length,
    //               ),
    //             ),
    //           );
    //           i += j - 1;
    //         }
    //       }
    //     } else {
    //       // Create incrementor and matching bool
    //       int j = 0;
    //       String accumulator = "";

    //       // Loop through each character
    //       do {
    //         if (i + j >= input.length) {
    //           break;
    //         }
    //         accumulator += input[i + j];
    //         j++;
    //       } while ((span.match as RegExp).firstMatch(accumulator) != null &&
    //           (span.match as RegExp).firstMatch(accumulator)![0] ==
    //               accumulator);

    //       if (i + j < input.length) {
    //         accumulator = accumulator.substring(0, accumulator.length - 1);
    //         j--;
    //       } else {
    //         accumulator = "";
    //         j = 0;
    //       }

    //       if (accumulator != "") {
    //         output.add(
    //           TokenData(
    //             span.getTokenName(),
    //             (i - 1) + span.start.length,
    //             (i + j) - span.end.length,
    //             accumulator,
    //           ),
    //         );
    //         accumulator = "";
    //         i += j - 1;
    //       }
    //     }
    //   }

        i++;
    }

    return output;

}

module.exports = tokenizer;