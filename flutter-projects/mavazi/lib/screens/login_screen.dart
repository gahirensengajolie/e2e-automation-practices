import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() {
    return _LoginScreenState();
  }
}

class _LoginScreenState extends State<LoginScreen> {
  final loginScreenFormKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool hidePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding:EdgeInsets.all(24),
          child: Form(
            key: loginScreenFormKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Image.asset(
                  'assets/images/logo.png',
                  width: 100,
                  height: 100,
                  fit: BoxFit.contain,
                ),
                const SizedBox(height: 16),
                const Text(
                  "Login",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.email_outlined),
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter email';
                    }
                    if (!value.contains('@')) {
                      return 'Please enter a valid email address';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 24,),
                TextFormField(
                  controller: passwordController,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.lock_outline),
                    border: const OutlineInputBorder(),
                    labelText: 'Password',
                    suffixIcon: IconButton(
                     onPressed: () {
                      setState(() {
                        hidePassword = !hidePassword;
                      });
                     },
                     icon: Icon(
                      hidePassword 
                      ? Icons.visibility_outlined
                      : Icons.visibility_off_outlined,
                     ),
                    ),
                  ),
                  obscureText: hidePassword,
                  validator: (value){
                      if (value == null || value.isEmpty){
                        return 'Enter your Password';
                      }
                      return null;
                  }
                ),

                SizedBox(height: 24),
                ElevatedButton(onPressed: (){
                  if (loginScreenFormKey.currentState!.validate ()){
                    //perfom login
                    // nacigate to home screen
                  }
                }, 
                child: Text("Login", style: TextStyle(color: Colors.white),),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightBlue,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8),
                  ),
                  ),
                ),

                SizedBox(height: 16),
                Row(children: [
                  Text("Don't have an account ?"),
                  TextButton(onPressed: () {}, child: Text("Sign Up"))
                ],
                mainAxisAlignment: MainAxisAlignment.center,) // Fixed the issue here

              ],
            ),
          ),
        ),
      ),
    );
  }
}
