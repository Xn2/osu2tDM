# osu2tDM
A little server app that allows you to chat with players in game through TwitterDMs. Made by [Banana-](https://new.ppy.sh/u/Banana-)
# Pre-requisites

  * A Windows, Mac or Linux-based server.
  
  * Node.js 7.7.2 or higher with the following modules installed : irc@0.5.0 (NOT 0.5.2), twit and twitter.
  
  * Git.
  
  * A Twitter verified bot account, with its API credentials (you need to enable direct messaging permissions).
  
  * Your own account's TwitterID
  
  * An osu! account (you'll need your IRC password, which is different from your normal password, more info [here](https://osu.ppy.sh/p/irc))

# Setup

 * Clone the repository with `git clone https://github.com/Xn2/osu2tdm`.
 
 * If you're running osu2tDM on a remote server, you can use `screen -R yourname` to create a process that will not end when you'll close the session.
 
 * Enter the bot's directory
 
 * Rename the `config.json.example` file info `config.json`, open this file and put your credentials
 
 * Start the bot with `node osu2tDM.js`
 
 * You should be ready to rock.

# Usage

 **From the Twitter DM interface :**
 
  * Use `@name message` to send a message to the person you want.
  
  * Type without any prefix to reply to the last user.
  
  * Use `!enable` and `!disable` to, well, enable or disable the bot :^)
  
  * Use `!tweet text` to make your bot tweet something.
  
**From the console interface :**

  * Use `msg name message` to send a message to the person you want.
  
  * Use `r message` to reply to the last user.
  
  * Use `enable` and `disable` to, well, enable or disable the bot :^) (no SHIT SHERLOCK LUL)

  * Use `stop` to end the process.
