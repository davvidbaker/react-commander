## 🔮 if things start getting real, use semantic-release

Things I could abstract, if there is ever a need:
- styling
- using a modal (remove it)


There are two phases, the phase where you enter the command, and the phase where you supply the parameters, if there are any.

... I probably don't need to be using a generator (which brings the peer dependency of regenerator-runtime, which I usually use in projects due to redux saga...). I need to look over my code and see if it really is making things more readable, or if there is a simple way to do things without the yielding generator stuff. Could I not just use a little counter?