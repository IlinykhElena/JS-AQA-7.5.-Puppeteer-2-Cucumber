Feature: booking tickets

        Scenario: the user selects and orders one seat
                Given user is on page
                When user choose day and movie
                And user choose row and seat
                Then ticket booking is confirmed

        Scenario: the user selects and orders several seats
                Given user is on page
                When user choose day and movie
                And user choose row and seats
                Then ticket booking is confirmed

        Scenario: the user selects and orders reserved seat
                Given user is on page
                When user choose day and movie
                And user choose row and seat
                And user is on page
                When user choose day and movie
                Then ticket booking is not possible