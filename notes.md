    collsion(obj1, obj2){
        return !(obj1.x > obj2.x + obj2.width ||
            obj1.x + obj1.width < obj2.x ||
            obj1.y > obj2.y + obj2.height ||
            obj1.y + obj1.h < obj2.y);
      }

      ||

         collsion(obj1, obj2){
        return (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.h > obj2.y);
      }