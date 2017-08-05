# osu2tDM
Une petite application serveur qui vous pemet d'utiliser le chat de osu! à travers des messages privés Twitter. Fait par [Banana-](https://new.ppy.sh/u/Banana-)
# Prérequis

  * Un serveur distant fonctionnant sous Windows, Mac ou Linux.
  
  * Node.js 7.7.2 ou plus récent avec les modules suivants : irc@0.5.0 (PAS 0.5.2), twit et twitter.
  
  * Git.
  
  * Un compte Twitter vérifié pour le bot, avec ses clés API (vous devez activer les permissions sur les messages privés).
  
  * Le TwitterID de votre propre compte Twitter
  
  * Votre compte osu! (vous aurez besoin de votre mot de passe IRC, qui est différent de votre mot de passe de compte, plus d'info [ici](https://osu.ppy.sh/p/irc))

# Installation

 * Téléchargez l'archive du bot `git clone https://github.com/Xn2/osu2tdm`.
 
 * Si vous comptez utiliser osu2tDM sur un serveur Linux, vous pouvez utiliser `screen -R unnom` pour que l'application ne se ferme pas lorsque vous fermez la session SSH.
 
 * Entrez dans le dossier du bot.
 
 * Renommez le fichier `confog.json.example` en `config.json`, ouvrez ce fichier et renseignez vos identifiants.
 
 * Lancez le programme avec `node osu2tDM.js`
 
 * Vous devriez être prêt.

# Usage

 **Depuis l'interface TwitterDM :**
 
  * Utilisez `@name message` pour envoyer un message à la personne de votre choix.
  
  * Ecrivez sans aucun préfixe pour répondre à l'utilisateur précédent.
  
  * Use `!enable` and `!disable` to, well, enable or disable the bot :^)
  
  * Use `!tweet text` to make your bot tweet something.
  
**Depuis l'interface console**

  * Utilisez `msg nom message` pour envoyer un message à la personne de votre choix.
  
  * Utilisez `r message` pour répondre au dernier utilisateur .
  
  * Utilisez `enable` et `disable` pour allumer ou éteindre le bot. (Merci Captain Obvious)

  * Utilisez `stop` pour arrêter le processus
