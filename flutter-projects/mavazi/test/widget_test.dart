// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
// Imports your actual login screen directly from your lib folder
import 'package:mavazi/screens/login_screen.dart';

void main() {
  testWidgets('Login screen input and submission smoke test', (WidgetTester tester) async {
    // Build our login screen inside a MaterialApp container
    await tester.pumpWidget(const MaterialApp(home: LoginScreen()));

    // Locate the email field, password field, and login button.
    final emailField = find.byType(TextField).first;
    final passwordField = find.byType(TextField).last;
    final loginButton = find.widgetWithText(ElevatedButton, 'Login');

    // Verify that the login form elements are present on screen.
    expect(emailField, findsOneWidget);
    expect(passwordField, findsOneWidget);
    expect(loginButton, findsOneWidget);

    // Enter test values into the input fields.
    await tester.enterText(emailField, 'user@example.com');
    await tester.enterText(passwordField, 'password123');
    await tester.pump();

    // Tap the Login button and wait for any transitions to settle.
    await tester.tap(loginButton);
    await tester.pumpAndSettle();
  });
}
